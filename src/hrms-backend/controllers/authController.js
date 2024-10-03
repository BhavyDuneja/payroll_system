const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    
    const [users] = await pool.execute(
      `SELECT e.*, r.role_name 
       FROM Employee e 
       JOIN Role r ON e.role_id = r.role_id 
       WHERE e.email = ?`,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.employee_id, role: user.role_name },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? '21d' : '1d' }
    );

    if (rememberMe) {
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 21 * 24 * 60 * 60 * 1000 // 3 weeks
      });
    }

    res.json({ token, user: {
      id: user.employee_id,
      email: user.email,
      role: user.role_name
    }});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };
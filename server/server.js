import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
const bcrypt = require('bcrypt');

var PORT = process.env.PORT || 8081;
dotenv.config() //ensure functional authentication
const app = express();
const saltRounds = 10; //for bcrypt password hashing

// Helper function to query the database
const queryDatabase = async (sql, params) => {
    const client = await pool.connect();
    try {
        const result = await client.query(sql, params);
        return result;
    } finally {
        client.release();
    }
};

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ error: 'Failed to authenticate token' });
        req.username = decoded.username;
        next();
    });
};

app.use(cors()); // allows cross-origin resource sharing
app.use(express.json());

// PostgreSQL database connection
const pool = new Pool({
    host: 'ceqbglof0h8enj.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
    user: 'ueeirr99f3g8v6', // replace with your PostgreSQL username
    password: 'p6da436fe834a8b4d9215adae8ae69e09fa637839e1d5eab45c5ca6024dfae4ff', // replace with your PostgreSQL password
    database: 'cd14potlp7pi5ghrud', // replace with your PostgreSQL database name
    port: 5432, // default PostgreSQL port
});

app.put('/edit/:username', async (req, res) => {
    const sql = `
        UPDATE employees SET username = $1, password = $2, email = $3, firstname = $4, lastname = $5, position = $6 
        WHERE username = $7
    `;
    const values = [
        req.body.username,
        req.body.email,
        req.body.firstname,
        req.body.lastname,
        req.body.position,
        req.params.username
    ];

    try {
        let hashedPassword;
        //needed for password because 
        if (req.body.password) {
            hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
        } else {
            password = await queryDatabase('SELECT password FROM employees WHERE username = $1', [req.params.username]);
            hashedPassword = user.rows[0].password;
        }
        values = [req.body.username, hashedPassword, ...values.slice(-1)]
        const result = await queryDatabase(sql, values);
        res.status(200).json({ message: 'Record updated successfully', result });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ message: "Error inside server", error: err });
    }
});

app.get('/home', async (req, res) => {
    const sql = "SELECT * FROM employees";
    try {
        const result = await queryDatabase(sql);
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ message: "Error inside server" });
    }
});

app.get('/read/:username', async (req, res) => {
    const sql = "SELECT * FROM employees WHERE username = $1";
    try {
        const result = await queryDatabase(sql, [req.params.username]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ message: "Error inside server" });
    }
});

app.post('/employees', async (req, res) => {
    const sql = `
        INSERT INTO employees (username, password, email, firstname, lastname, position) 
        VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [
        req.body.username,
        req.body.email,
        req.body.firstname,
        req.body.lastname,
        req.body.position
    ];

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // Add the hashed password to the values array
        const valuesWithHash = [req.body.username, hashedPassword, ...values.slice(1)];

        // Execute the database query with the hashed password
        const result = await queryDatabase(sql, valuesWithHash);

        res.status(201).json({ message: 'Record inserted successfully', result });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err });
    }
});

app.delete('/delete/:username', async (req, res) => {
    const sql = "DELETE FROM employees WHERE username = $1";
    try {
        const result = await queryDatabase(sql, [req.params.username]);
        res.status(200).json({ message: 'Employee successfully deleted', result });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err });
    }
});

app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM employees WHERE username = $1';

    try {
        const result = await queryDatabase(sql, [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            passwordMatch = await bcrypt.compare(user.password, password)
            if (passwordMatch) {
                const jwtToken = jwt.sign(
                    { username: username },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                res.json({ message: "Welcome back!", token: jwtToken });
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Username doesn\'t exist' });
    }
});


// New search endpoint
app.get('/search', async (req, res) => {
    const searchTerm = req.query.q;
    const sql = `
        SELECT * FROM employees WHERE 
        username LIKE $1 OR 
        firstname LIKE $2 OR 
        lastname LIKE $3 OR 
        position LIKE $4
    `;
    const values = [
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`
    ];

    try {
        const result = await queryDatabase(sql, values);
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err });
    }
});

//clock-in and out functionality

// The rest of the code remains mostly unchanged, just replace `queryDatabase` with `queryDatabase`
const getCurrentClockStatus = async (username) => {
    const sql = `
        SELECT * FROM clockins 
        WHERE username = $1 AND date = CURRENT_DATE 
        ORDER BY clockin_time DESC LIMIT 1
    `;
    const result = await queryDatabase(sql, [username]);
    return result.rows[0] || null;
};

app.get('/currentstatus', verifyToken, async (req, res) => {
    try {
        const status = await getCurrentClockStatus(req.username);
        res.json(status);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err });
    }
});

// Clock-in endpoint
app.post('/clockin', verifyToken, async (req, res) => {
    try {
        const status = await getCurrentClockStatus(req.username);
        if (status && !status.clockout_time) {
            return res.status(400).json({ error: 'Already clocked in' });
        }
        
        const sql = "INSERT INTO clockins (username, date, clockin_time) VALUES ($1, CURDATE(), CURTIME())";
        queryDatabase(sql, [req.username], (err, result) => {
            if (err) return res.status(500).json({ error: 'Internal Server Error', details: err });
            res.status(201).json({ message: 'Clocked in successfully', result });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err });
    }
});

// Lunch start endpoint
app.post('/lunchstart', verifyToken, async (req, res) => {
    try {
        const status = await getCurrentClockStatus(req.username);
        if (!status || status.clockout_time) {
            return res.status(400).json({ error: 'Not clocked in' });
        }
        if (status.lunch_start && !status.lunch_end) {
            return res.status(400).json({ error: 'Already on lunch break' });
        }
        if (status.lunch_start && status.lunch_end) {
            return res.status(400).json({ error: 'Lunch break already taken for this clock-in event' });
        }
        
        const sql = "UPDATE clockins SET lunch_start = CURTIME() WHERE id = $1";
        queryDatabase(sql, [status.id], (err, result) => {
            if (err) return res.status(500).json({ error: 'Internal Server Error', details: err });
            res.status(200).json({ message: 'Lunch started successfully', result });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err });
    }
});

// Lunch end endpoint
app.post('/lunchend', verifyToken, async (req, res) => {
    try {
        const status = await getCurrentClockStatus(req.username);
        if (!status || status.clockout_time) {
            return res.status(400).json({ error: 'Not clocked in' });
        }
        if (!status.lunch_start) {
            return res.status(400).json({ error: 'Lunch break not started' });
        }
        if (status.lunch_end) {
            return res.status(400).json({ error: 'Lunch break already ended' });
        }
        
        const sql = "UPDATE clockins SET lunch_end = CURTIME() WHERE id = $1";
        queryDatabase(sql, [status.id], (err, result) => {
            if (err) return res.status(500).json({ error: 'Internal Server Error', details: err });
            res.status(200).json({ message: 'Lunch ended successfully', result });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err });
    }
});

// Clock-out endpoint
app.post('/clockout', verifyToken, async (req, res) => {
    try {
        const status = await getCurrentClockStatus(req.username);
        if (!status || status.clockout_time) {
            return res.status(400).json({ error: 'Not clocked in' });
        }
        if (status.lunch_start && !status.lunch_end) {
            return res.status(400).json({ error: 'Cannot clock out while on lunch break' });
        }
        
        const sql = "UPDATE clockins SET clockout_time = CURTIME() WHERE id = $1";
        queryDatabase(sql, [status.id], (err, result) => {
            if (err) return res.status(500).json({ error: 'Internal Server Error', details: err });
            res.status(200).json({ message: 'Clocked out successfully', result });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err });
    }
});

// Get clock-in/out history
app.get('/clockhistory/:username', verifyToken, (req, res) => {
    const sql = "SELECT date, clockin_time, lunch_start, lunch_end, clockout_time FROM clockins WHERE username = $1 ORDER BY date DESC, clockin_time DESC";
    const username = req.params.username;
    queryDatabase(sql, [username], (err, result) => {
        if (err) return res.status(500).json({ error: 'Internal Server Error', details: err });
        res.status(200).json(result);
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
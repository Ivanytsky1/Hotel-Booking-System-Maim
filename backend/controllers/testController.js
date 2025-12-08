// Controller for test route
const testMessage = (req, res) => {
    res.json({ message: "Backend is working!" });
};

module.exports = { testMessage };

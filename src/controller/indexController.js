const axios = require("axios")

const getWelcome = async (req, res) => {
    const { urlslug } = req.params;
    try {
        // const response = await axios.get(`http://localhost:5000/api/v2/read/${urlslug}`);
        // console.log(response.data);
        console.log(urlslug);
        res.render("welcome", { urlslug , article: response.data });
    } catch (error) {
        const errorMessage = error.message || 'Internal Server Error';
        res.status(500).render("welcome", {
            error: errorMessage,
            urlslug
        });
    }
};

const getHome = async (req, res) => {
    const { urlslug } = req.params;
    try {
        // const response = await axios.get(`http://localhost:5000/api/v2/read/${urlslug}`);
        // console.log(response.data);
        console.log(urlslug);
        res.render("index", { urlslug , article: response.data });
    } catch (error) {
        const errorMessage = error.message || 'Internal Server Error';
        res.status(500).render("index", {
            error: errorMessage,
            urlslug
        });
    }
};

module.exports = {
    getHome,
    getWelcome
}
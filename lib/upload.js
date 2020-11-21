const upload = require("./middleUpload");

const uploadFile = async (req, res) => {
    try {
        await upload(req, res);

        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        return res.status(200).json({
            imageID: req.file.id
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload image: ${error}`);
    }
};

module.exports = { uploadFile }
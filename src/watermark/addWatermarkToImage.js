const Jimp = require("jimp");

const getDimensions = (H, W, h, w, ratio) => {
    let hh, ww;
    if (H / W < h / w) {
        //GREATER HEIGHT
        hh = ratio * H;
        ww = (hh / h) * w;
    } else {
        //GREATER WIDTH
        ww = ratio * W;
        hh = (ww / w) * h;
    }
    return [hh, ww];
};
const addWatermarkToImage = async ({
    mainImage,
    watermarkUrl,
    ratio,
    opacity,
}) => {
    //  Type of mainImage must be Buffer or string (url)
    try {
        var options = {
            ratio: ratio ?? 0.8, // Should be less than one
            opacity: opacity ?? 0.6, //Should be less than one
        };

        const main = await Jimp.read(mainImage);
        const watermark = await Jimp.read(watermarkUrl);
        const [newHeight, newWidth] = getDimensions(
            main.getHeight(),
            main.getWidth(),
            watermark.getHeight(),
            watermark.getWidth(),
            options.ratio
        );
        watermark.resize(newWidth, newHeight);
        const positionX = (main.getWidth() - newWidth) / 2; //Centre aligned
        const positionY = (main.getHeight() - newHeight) / 2; //Centre aligned
        watermark.opacity(options.opacity);
        main.composite(
            watermark,
            positionX,
            positionY,
            Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
        );
        let image = main.quality(100);
        let mimeImg = image.getMIME();

        let bufferImage = await image.getBufferAsync(mimeImg);
        return bufferImage;
    } catch (error) {
        return mainImage;
    }
};

module.exports = { addWatermarkToImage };

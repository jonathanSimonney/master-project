// const NodeID3 = require('node-id3')

//helper to set the good author to the downloaded file
export default function  setFileAuthor(filePath, fileAuthor){
    let tags = {
        artist: fileAuthor
    };
    addTagsToFile(filePath, tags)
}

function addTagsToFile(filePath, newTags){
    //  Update existing ID3-Frame with new/edited tags
    // let success = NodeID3.update(newTags, filePath) //  Returns true/false or, if buffer passed as file, the tagged buffer
    // if (!success){
    //     console.warn("failed to download music.")
    // }
}
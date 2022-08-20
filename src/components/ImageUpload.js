import React from "react";
import { Box, Text, Spinner } from "@chakra-ui/react"
import { BsCamera } from "react-icons/bs";

const ImageUpload = ({url, loading, handleImage, imageData}) => {
    return(
        <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                <Box
                    width="100%"
                    height="200px"
                    border="1px dashed grey"
                    borderRadius="10px"
                    textAlign="center"
                    backgroundImage={ `url(${url})`}
                    backgroundSize= "cover"
                    backgroundRepeat= "no-repeat"
                    backgroundPosition= "center"
                    opacity={ loading ? "0.4" : "1"}
                    padding={ loading ? "3.2em 5em" : ""}
                    maxWidth="300px"
                    marginBottom={2}
                >
                    {loading ? (
                        <Spinner marginTop="50px"/>
                    ) : (
                        <>
                            <Box
                                role="button"
                                marginTop="60px"
                                color="blue"
                            >
                                <BsCamera style={{margin:"auto", fontSize:"28px"}}/>
                            </Box>
                            <Text color="blue.400" fontWeight="700" fontSize="16px" my={3}>Click to add a photo</Text>
                            <input
                                type="file"
                                name="image"
                                placeholder="add photo"
                                id={"file-upload"}
                                onChange={handleImage}
                                disabled={loading}
                                accept="image/*"
                                style={{
                                    visibility:"hidden"
                                }}
                            />
                            {imageData && (
                                <Text fontSize="12px" my={3}>{imageData}</Text>
                            )}
                        </>
                    )}
                </Box>
            </label>
    )
}

export default ImageUpload;
import { Box, Button, CardActions, CardContent, FormControlLabel, Rating, Switch, TextField, Typography, styled } from "@mui/material";
import { useState } from "react";
import { createReview, fetchData, updateReview } from "../services/api";
import { useDispatch } from "react-redux";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ReviewInteface } from "../store/types";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ReviewModalProps {
    formData: ReviewInteface;
    setFormData: any;
    productId: string;
    action: string;
    handleAddReviewClose: any;
    handleEditReviewClose: any;
}

interface ReviewFormData {
    name: string;
    email: string;
    title: string;
    content: string;
    rating: number;
}

interface ReviewFormError {
    name: boolean;
    email: boolean;
    title: boolean;
    content: boolean;
    rating: boolean;
}

const ReviewModal: React.FC<ReviewModalProps> = (props) => {
    const { formData, setFormData, productId, action, handleAddReviewClose, handleEditReviewClose } = props;
    const dispatch = useDispatch();
    const [formError, setFormError] = useState<ReviewFormError>({
        name: false,
        email: false,
        title: false,
        content: false,
        rating: false,
    });
    const [error, setError] = useState<string | null>(null);
    const [selectedVerifiedValue, setSelectedVerifiedValue] = useState<string>("false");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const mapRating = (rating: string | number): number => {
        const ratingValue = typeof rating === 'string' ? parseInt(rating, 10) : rating;
        const firstDigit = Math.floor(Math.abs(ratingValue) / Math.pow(10, Math.floor(Math.log10(Math.abs(ratingValue)))));
        return (firstDigit >= 0 && firstDigit <= 5) ? firstDigit : 5;
    }

    const handleVerifiedChange = (value: string) => {
        setSelectedVerifiedValue(value);
    };

    const handleInputChange = (field: keyof ReviewFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: event.target.value });
        setFormError({ ...formError, [field]: event.target.value !== '' ? false : true });
    };

    const handleRatingChange = (event: React.ChangeEvent<{}>, value: number | null) => {
        if (value !== null) {
            setFormData({ ...formData, rating: value });
        }
    };

    const handleSubmit = async () => {
        setError(null);

        try {
            const newFormError = { name: false, email: false, title: false, content: false, rating: false };

            if (formData.name === "") newFormError.name = true;
            if (formData.email === "") newFormError.email = true;
            if (formData.title === "") newFormError.title = true;
            if (formData.content === "") newFormError.content = true;
            if (formData.rating === 0) newFormError.rating = true;

            if (Object.values(newFormError).some((value) => value)) {
                setFormError(newFormError)
                throw new Error('Rating, name, email, title, and content are required.');
            }

            try {
                if (action === "add") {
                    await createReview({
                        ...formData,
                        avatar: "https://www.pngkey.com/detail/u2q8e6w7r5w7i1u2_empty-profile-picture-circle/",
                        likes: 0,
                        verified: selectedVerifiedValue === "true" ? true : false,
                        productId: productId
                    })
                } else {
                    await updateReview(formData['id'], {
                        ...formData,
                        verified: selectedVerifiedValue === "true" ? true : false,
                        createdAt: new Date()
                    })
                }
                action === "add" ? handleAddReviewClose() : handleEditReviewClose()
                setFormData({
                    name: '',
                    email: '',
                    title: '',
                    content: '',
                    rating: 0,
                    avatar: '',
                    likes: 0,
                    verified: false,
                })
                try {
                    const result = await fetchData();
                    dispatch({
                        type: 'FETCH_DATA_SUCCESS', payload: {
                            products: result.products,
                            categories: result.categories,
                            reviews: result.reviews
                        }
                    });
                } catch (error: any) {
                    dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
                }
            } 
            catch (error: any) {
                throw Error(error)
            }
        } catch (error: any) {
            console.error('Error:', error.message);
            setError(error.message);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    if (formData['verified'] === true && selectedVerifiedValue === "false") setSelectedVerifiedValue("true")

    return (
        <Box sx={style}>
            <Box className="review-modal">
                <Rating name="size-large" value={parseInt((formData['rating']).toString()) > 0 ? mapRating(formData['rating']) : 0} onChange={handleRatingChange} size="large" aria-required />
                <Box>Rate this product <span style={{ color: 'red' }}>*</span></Box>
            </Box>
            <CardContent>
                <div>
                    <TextField
                        required
                        id="name"
                        label="Name"
                        fullWidth={true}
                        margin="normal"
                        onChange={handleInputChange('name')}
                        error={formError['name']}
                        value={formData['name']}
                    />
                    <TextField
                        required
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth={true}
                        margin="normal"
                        onChange={handleInputChange('email')}
                        error={formError['email']}
                        value={formData['email']}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ paddingBottom: 0.5, marginRight: 2 }}>Avatar: </Box>
                        <Button component="label" variant="contained" size="small" startIcon={<CloudUploadIcon />} disabled>
                            Upload file
                            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                        </Button>
                        {selectedFile && <Box sx={{ marginLeft: 1, fontSize: 12 }}>{selectedFile.name}</Box>}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ paddingBottom: 0.5, marginRight: 2 }}>Verified: </Box>

                        <FormControlLabel
                            sx={{
                                display: 'block',
                            }}
                            control={
                                <Switch
                                    checked={selectedVerifiedValue === "true" ? true : false}
                                    onChange={() => handleVerifiedChange(selectedVerifiedValue === "false" ? "true" : "false")}
                                    name="verified-switch"
                                    color="primary"
                                />
                            }
                            label=""
                        />
                    </Box>
                    <TextField
                        required
                        id="title"
                        label="Title"
                        fullWidth={true}
                        margin="normal"
                        onChange={handleInputChange('title')}
                        error={formError['title']}
                        value={formData['title']}
                    />
                    <TextField
                        required
                        id="content"
                        label="Content"
                        multiline
                        rows={4}
                        fullWidth={true}
                        margin="normal"
                        onChange={handleInputChange('content')}
                        error={formError['content']}
                        value={formData['content']}
                    />
                </div>
            </CardContent>
            {error && (
                <Typography color="error" variant="body2" style={{ marginTop: '16px' }} className="review-modal">
                    {error}
                </Typography>
            )}
            <CardActions className="review-modal">
                <Button size="large" variant="contained" color="primary" fullWidth={true} onClick={handleSubmit}>
                    Submit
                </Button>
            </CardActions>
        </Box>
    )
}

export default ReviewModal;
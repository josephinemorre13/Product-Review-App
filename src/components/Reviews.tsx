import { Avatar, Badge, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Modal, Rating, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VerifiedIcon from '@mui/icons-material/Verified';
import ReviewModal from "./ReviewModal";
import { deleteReview, fetchData, updateReview } from "../services/api";
import { useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ReviewInteface } from "../store/types";

interface ReviewsProps {
    calculateAverageRating: any;
    reviews: ReviewInteface[];
    mapRatings: any;
    productId: string;
}

const Reviews: React.FC<ReviewsProps> = (props) => {
    const { calculateAverageRating, reviews, mapRatings, productId } = props;
    const [addReviewOpen, setAddReviewOpen] = useState(false);
    const handleAddReviewOpen = () => setAddReviewOpen(true);
    const handleAddReviewClose = () => setAddReviewOpen(false);
    const [editReviewOpen, setEditReviewOpen] = useState(false);
    const handleEditReviewClose = () => setEditReviewOpen(false);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<ReviewInteface | any>({
        name: '',
        email: '',
        title: '',
        content: '',
        rating: 0,
        avatar: '',
        likes: 0,
        verified: false,
    });

    const handleEditReviewOpen = (review: ReviewInteface) => {
        setFormData(review)
        setEditReviewOpen(true);
    }

    const handleDeleteReviewButton = async (reviewId: string) => {
        await deleteReview(reviewId)
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

    const mapRating = (rating: string | number): number => {
        const ratingValue = typeof rating === 'string' ? parseInt(rating, 10) : rating;
        const firstDigit = Math.floor(Math.abs(ratingValue) / Math.pow(10, Math.floor(Math.log10(Math.abs(ratingValue)))));
        return (firstDigit >= 0 && firstDigit <= 5) ? firstDigit : 5;
    }

    const decimalToPercentage = (decimal: number, precision: number = 2): number => {
        const percentage = decimal * 100;
        const roundedPercentage = Math.round(percentage * Math.pow(10, precision)) / Math.pow(10, precision);
        return roundedPercentage;
    }

    const handleLikeReview = async (review: ReviewInteface) => {
        await updateReview(review.id, { ...review, likes: ++review.likes })
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

    return (
        <section>
            <div className="review-stars">
                <Typography variant="subtitle1" gutterBottom>
                    Customer Reviews
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', height: 40 }} >
                    <Rating
                        value={reviews.length === 0 ? 0 : calculateAverageRating(reviews)}
                        precision={0.2}
                        readOnly
                    />
                    <Box sx={{ marginLeft: 1 }}>{reviews.length === 0 ? 'No reviews yet' : calculateAverageRating(reviews) + ' out of 5'}</Box>
                </Box>
                <Stack spacing={1} className="mb-2">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ marginRight: 1 }}>5 star</Box>
                        <Rating defaultValue={5} size="small" readOnly />
                        <Box sx={{ marginLeft: 1 }}>{reviews.length > 0 ? decimalToPercentage(mapRatings(reviews).filter((v: ReviewInteface | any) => v.mappedRating === 5).length / reviews.length) : '0'} %</Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ marginRight: 1 }}>4 star</Box>
                        <Rating defaultValue={4} size="small" readOnly />
                        <Box sx={{ marginLeft: 1 }}>{reviews.length > 0 ? decimalToPercentage(mapRatings(reviews).filter((v: ReviewInteface | any) => v.mappedRating === 4).length / reviews.length) : '0'} %</Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ marginRight: 1 }}>3 star</Box>
                        <Rating defaultValue={3} size="small" readOnly />
                        <Box sx={{ marginLeft: 1 }}>{reviews.length > 0 ? decimalToPercentage(mapRatings(reviews).filter((v: ReviewInteface | any) => v.mappedRating === 3).length / reviews.length) : '0'} %</Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ marginRight: 1 }}>2 star</Box>
                        <Rating defaultValue={2} size="small" readOnly />
                        <Box sx={{ marginLeft: 1 }}>{reviews.length > 0 ? decimalToPercentage(mapRatings(reviews).filter((v: ReviewInteface | any) => v.mappedRating === 2).length / reviews.length) : '0'} %</Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ marginRight: 1 }}>1 star</Box>
                        <Rating defaultValue={1} size="small" readOnly />
                        <Box sx={{ marginLeft: 1 }}>{reviews.length > 0 ? decimalToPercentage(mapRatings(reviews).filter((v: ReviewInteface | any) => v.mappedRating === 1).length / reviews.length) : '0'} %</Box>
                    </Box>
                </Stack>
                <div>
                    <Button variant="contained" onClick={handleAddReviewOpen}>Add Review</Button>
                    <Modal
                        open={addReviewOpen}
                        onClose={handleAddReviewClose}
                        aria-labelledby="add"
                        aria-describedby="add-review"
                    >
                        <ReviewModal formData={formData} setFormData={setFormData} productId={productId} action="add" handleAddReviewClose={handleAddReviewClose} handleEditReviewClose={handleEditReviewClose} />
                    </Modal>
                </div>
            </div>
            {reviews.sort((a: ReviewInteface, b: ReviewInteface) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((review: ReviewInteface) => {
                return <Card sx={{ maxWidth: 1200, marginTop: 1, marginBottom: 1 }} key={review.id}>
                    <CardHeader
                        avatar={
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    review.verified ? <VerifiedIcon color="primary" /> : null
                                }
                            >
                                <Avatar alt={review.name} src={review.avatar} />
                            </Badge>
                        }
                        title={review.name}
                        subheader={review.email}
                    />
                    <Divider variant="middle" />
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                            <Rating name="size-small" value={mapRating(review.rating)} size="small" readOnly />
                            <Box sx={{ marginLeft: 1 }}>{review.title}</Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            {review.content}
                        </Typography>
                    </CardContent>
                    <Divider variant="middle" textAlign="right">{new Date(review.createdAt).toLocaleDateString()}</Divider>
                    <CardActions disableSpacing>
                        <IconButton aria-label="like" onClick={() => handleLikeReview(review)}>
                            <ThumbUpIcon color="action" />
                        </IconButton>
                        <span>{review.likes}</span>
                        <div>
                            <IconButton aria-label="edit" style={{ marginLeft: '50px' }} onClick={() => handleEditReviewOpen(review)}>
                                <EditIcon />
                            </IconButton>
                            <Modal
                                open={editReviewOpen}
                                onClose={handleEditReviewClose}
                                aria-labelledby="edit"
                                aria-describedby="edit-review"
                            >
                                <ReviewModal formData={formData} setFormData={setFormData} productId={productId} action="edit" handleAddReviewClose={handleAddReviewClose} handleEditReviewClose={handleEditReviewClose} />
                            </Modal>
                        </div>
                        <IconButton aria-label="delete" onClick={() => handleDeleteReviewButton(review.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            })}
        </section>
    );
};

export default Reviews;
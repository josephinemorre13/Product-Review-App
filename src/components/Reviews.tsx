import { Avatar, Badge, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Modal, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VerifiedIcon from '@mui/icons-material/Verified';

interface ReviewsProps {
    calculateAverageRating: any;
    reviews: any;
    mapRatings: any;
}

const Reviews: React.FC<ReviewsProps> = (props) => {
    const { calculateAverageRating, reviews, mapRatings } = props;
    console.log("%c reviews ", "font-size:16px;background-color:#9fa193;color:white;", reviews)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const mapRating = (rating: string | number) => {
        const ratingValue = typeof rating === 'string' ? parseInt(rating, 10) : rating;
        const firstDigit = Math.floor(Math.abs(ratingValue) / Math.pow(10, Math.floor(Math.log10(Math.abs(ratingValue)))));
        return (firstDigit >= 0 && firstDigit <= 5) ? 1 : 5;
    }

    return (
        <section>
            <div className="review-stars">
                <Typography variant="subtitle1" gutterBottom>
                    Customer Reviews
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', height: 40 }} >
                    <Rating
                        name="read-only"
                        value={reviews.length === 0 ? 0 : calculateAverageRating(reviews)}
                        precision={0.5}
                        readOnly
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <Box sx={{ marginLeft: 1 }}>{reviews.length === 0 ? 'No reviews yet' : calculateAverageRating(reviews) + ' out of 5'}</Box>
                </Box>
                <Stack spacing={1} className="mb-2">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ marginRight: 1 }}>5 star</Box>
                        <Rating name="size-small" defaultValue={5} size="small" readOnly />
                        <Box sx={{ marginLeft: 1 }}>{(mapRatings(reviews).filter((v: any) => v.mappedRating === 5).length / reviews.length) * 100} %</Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ marginRight: 1 }}>4 star</Box>
                        <Rating name="size-small" defaultValue={4} size="small" readOnly />
                        <Box sx={{ marginLeft: 1 }}>{(mapRatings(reviews).filter((v: any) => v.mappedRating === 4).length / reviews.length) * 100} %</Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ marginRight: 1 }}>3 star</Box>
                        <Rating name="size-small" defaultValue={3} size="small" readOnly />
                        <Box sx={{ marginLeft: 1 }}>{(mapRatings(reviews).filter((v: any) => v.mappedRating === 3).length / reviews.length) * 100} %</Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ marginRight: 1 }}>2 star</Box>
                        <Rating name="size-small" defaultValue={2} size="small" readOnly />
                        <Box sx={{ marginLeft: 1 }}>{(mapRatings(reviews).filter((v: any) => v.mappedRating === 2).length / reviews.length) * 100} %</Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ marginRight: 1 }}>1 star</Box>
                        <Rating name="size-small" defaultValue={1} size="small" readOnly />
                        <Box sx={{ marginLeft: 1 }}>{(mapRatings(reviews).filter((v: any) => v.mappedRating === 1).length / reviews.length) * 100} %</Box>
                    </Box>
                </Stack>
                <div>
                    <Button variant="contained" onClick={handleOpen}>Add Review</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Card />
                    </Modal>
                </div>
            </div>
            {reviews.map((review: any) => {
                return <Card sx={{ maxWidth: 1200, marginTop: 1, marginBottom: 1 }}>
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
                            <Rating name="size-small" defaultValue={mapRating(review.rating)} size="small" readOnly />
                            <Box sx={{ marginLeft: 1 }}>{review.title}</Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            {review.content}
                        </Typography>
                    </CardContent>
                    <Divider variant="middle" textAlign="right">{new Date(review.createdAt).toLocaleDateString()}</Divider>
                    <CardActions disableSpacing>
                        <IconButton aria-label="like">
                            <ThumbUpIcon color="action" />
                        </IconButton>
                        <span>{review.likes}</span>
                    </CardActions>
                </Card>
            })}
        </section>
    );
};

export default Reviews;
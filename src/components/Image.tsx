import React, { useState, useEffect } from "react";

interface ImageProps {
	imgSrc: string;
}

const Image: React.FC<ImageProps> = (props) => {
	const { imgSrc } = props;

	return (
		<section className="gallery-holder hide-in-mobile">
			<section className="gallery">
				<div className="image">
					<img src={imgSrc} alt="product" width={500} />
				</div>
			</section>
		</section>
	);
};

export default Image;
import React from "react";

function campaignPriceCalculator(originalPrice: number, discountedPrice: number): string {
    if (discountedPrice < originalPrice) {
      const discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
      return `${discountPercentage.toFixed(0)}% off`;
    }
    return '';
  }

export default campaignPriceCalculator;
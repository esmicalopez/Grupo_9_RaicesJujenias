let offerCalc = (precioActual, discount)=>{
    let priceWithDiscount = precioActual - (precioActual * (discount / 100))
    return +priceWithDiscount.toFixed(2)
  };

  module.exports = offerCalc
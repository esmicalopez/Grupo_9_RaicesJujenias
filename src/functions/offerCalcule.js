let offerCalc = (precioActual, discount)=>{
    let priceWithDiscount = precioActual - (precioActual * (discount / 100))
    return priceWithDiscount
  };

  module.exports = offerCalc
export function getRandomNumber(min, max) {
    // Calculate the range by subtracting min from max
    const range = max - min;
  
    // Generate a random number between 0 and range
    const randomNumberInRange = Math.random() * range;
  
    // Add the min value to the random number to shift it within the desired range
    const randomNumber = randomNumberInRange + min;
  
    // Round the random number to an integer using Math.floor or Math.ceil
    // depending on whether you want the minimum or maximum value to be inclusive
    return Math.floor(randomNumber);
}

export default {
    getRandomNumber
}

// const min5 = minLenght(5);
//
// min5(number) ==> dostajemy true

export const minLength = min => value => {
    if (typeof value === 'string') {
        return value.length < min;
    }

    return true;
};

export const handleErrors = (err) => {
    console.log(err.message, err.code);
    
    let errors = { email: '', password: '' };
    
        if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered yet!';
        return errors;
        }
    
        if (err.message === 'incorrect password') {
        errors.password = 'Invalid password!';
        return errors;
        }
    
        // Duplication error code
        if (err.code === 11000) {
        errors.email = 'That email is already used!';
        return errors;
        }
    
        // Validation errors
        if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        }
    
        return errors;
    };
    
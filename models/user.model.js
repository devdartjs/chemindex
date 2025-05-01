import mongoose from 'mongoose';
import emailVal from 'validator';
import bcrypt from 'bcrypt';

const { isEmail } = emailVal;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },

    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log('models-user-hookPre--Password was hashed:', this.password);
    next();
});

userSchema.post('save', function (doc, next) {
    console.log('models-user-hookPost--An user was created:', doc);
    next();
});

userSchema.statics.login = async function (email, password) {
    try {
        const user = await this.findOne({ email });

        if (!user) {
        throw new Error('incorrect email');
        }

        const auth = await bcrypt.compare(password, user.password);

        if (auth) {
        console.log('authorized');
        return user;
        } else {
        throw new Error('incorrect password');
        }
    } catch (error) {
        console.log('models-login (4)', error);
        throw error;
    }
};

const User = mongoose.model('user', userSchema);

export default User;

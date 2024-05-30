const userModel = require('../models/user.model');

module.exports.postUser = async (req, res) => {
    try {

        //Checks if the email is valid
        const email = req.body.email;
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'The email format is invalid.' });
        }

        //Checks if the email already exists
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'This email is already associated with another account. Try another one or login' });
        }

        //Checks if the pseudo already exists
        const existingPseudo = await userModel.findOne({ pseudo: req.body.pseudo });
        if (existingPseudo) {
            return res.status(400).json({ message: 'This pseudo is already taken.' });
        }

        //Checks if the password length is valid (8 characters minimum)
        const password = req.body.password;
        if (password.length < 8) {
            return res.status(400).json({ message: 'The password must be at least 8 characters long.' });
        }

        //Check if the password contains at least one special character
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharacterRegex.test(password)) {
            return res.status(400).json({ message: 'The password must contain at least one special character.' });
        }
        
        //Check if the password contains at least one number
        const numberRegex = /[0-9]/;
        if (!numberRegex.test(password)) {
            return res.status(400).json({ message: 'The password must contain at least one number.' });
        }

        //Check if the password contains at least one uppercase letter
        const uppercaseRegex = /[A-Z]/;
        if (!uppercaseRegex.test(password)) {
            return res.status(400).json({ message: 'The password must contain at least one uppercase letter.' });
        }

        //Check if the password contains at least one lowercase letter
        const lowercaseRegex = /[a-z]/;
        if (!lowercaseRegex.test(password)) {
            return res.status(400).json({ message: 'The password must contain at least one lowercase letter.' });
        }

        //Check if the last name is valid
        const lastName = req.body.lastName;
        const lastNameRegex = /^[a-zA-Z]+$/;
        if (!lastNameRegex.test(lastName)) {
            return res.status(400).json({ message: 'The last name format is invalid.' });
        }

        //Check if the first name is valid
        const firstName = req.body.firstName;
        const firstNameRegex = /^[a-zA-Z]+$/;
        if (!firstNameRegex.test(firstName)) {
            return res.status(400).json({ message: 'The first name format is invalid.' });
        }

        //Check if the pseudo is valid
        const pseudo = req.body.pseudo;
        const pseudoRegex = /^[a-zA-Z0-9]+$/;
        if (!pseudoRegex.test(pseudo)) {
            return res.status(400).json({ message: 'The pseudo format is invalid.' });
        }

        //Check if the date of birth is valid
        const dateOfBirth = req.body.dateOfBirth;
        const dateOfBirthRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateOfBirthRegex.test(dateOfBirth)) {
            return res.status(400).json({ message: 'The date of birth format is invalid.' });
        }

        // Check if the user age is at least 15 years old
        const calculateAge = (dob) => {
            const diff = Date.now() - new Date(dob).getTime();
            const ageDate = new Date(diff);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        };

        const age = calculateAge(dateOfBirth);
        if (age < 15) {
            return res.status(400).json({ message: 'You must be at least 15 years old to register.' });
        }
        
        // Check if the type is in the list
        const type = req.body.type;
        const typeList = ['Student', 'Teacher', 'Admin'];
        if (!typeList.includes(type)) {
            return res.status(400).json({ message: "This type doesnt exist" });
        }

        // Créer un nouvel utilisateur
        const user = new userModel({
            email: req.body.email,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            pseudo: req.body.pseudo,
            password: req.body.password,
            dateOfBirth: req.body.dateOfBirth,
            type: req.body.type,
        });

        // Sauvegarder l'utilisateur
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

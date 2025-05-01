export const getIndexPage = async(req, res) => {
    return res.status(200).render('home', { user: res.locals.user});
};

export const getUserSystemPage = async(req, res) => {
    return res.status(200).render('user-system', { user: res.locals.user});
}

export const getUserRegisterPage = async(req, res) => {
    console.log('register page');
    return res.status(200).json({ locals: res.locals});
}

export const getUserUpdatePage = async(req, res) => {
    console.log('update page');
    return res.status(200).json({ message: 'Search-Update Page'});
}

export const getSingUpPage = (req, res) => {
    return res.status(200).render('sign-up', { user: res.locals.user });
};

export const getLoginPage = (req, res) => {
    return res.status(200).render('login', { user: res.locals.user });
};

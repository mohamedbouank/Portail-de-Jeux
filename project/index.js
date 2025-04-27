document.addEventListener('DOMContentLoaded', function() {
    const loginPage = document.getElementById('loginPage');
    const signupPage = document.getElementById('signupPage');
    const brandsPage = document.getElementById('brandsPage');
    const teslaPage = document.getElementById('teslaPage');
    const bmwPage = document.getElementById('bmwPage');
    const toyotaPage = document.getElementById('toyotaPage');
    const audiPage = document.getElementById('audiPage');
    const mercedesPage = document.getElementById('mercedesPage');
    const peugeotPage = document.getElementById('peugeotPage');
    
    // Navigation entre les pages de connexion/inscription
    document.getElementById('signupLink').addEventListener('click', function() {
        loginPage.classList.add('hide');
        signupPage.classList.remove('hide');
    });
    
    document.getElementById('loginLink').addEventListener('click', function() {
        signupPage.classList.add('hide');
        loginPage.classList.remove('hide');
    });
    
    // Logique d'inscription
    document.getElementById('signupButton').addEventListener('click', function() {
        const username = document.getElementById('newUsername').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (username && email && password && password === confirmPassword) {
            signupPage.classList.add('hide');
            loginPage.classList.remove('hide');
            alert('Compte créé avec succès! Vous pouvez maintenant vous connecter.');
        } else if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
        } else {
            alert('Veuillez remplir tous les champs');
        }
    });
    
    // Logique de connexion
    document.getElementById('loginButton').addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username && password) {
            loginPage.classList.add('hide');
            brandsPage.classList.remove('hide');
        } else {
            alert('Veuillez remplir tous les champs');
        }
    });
    
    // Navigation vers les pages de voitures
    document.getElementById('teslaCard').addEventListener('click', function() {
        brandsPage.classList.add('hide');
        teslaPage.classList.remove('hide');
    });
    
    document.getElementById('bmwCard').addEventListener('click', function() {
        brandsPage.classList.add('hide');
        bmwPage.classList.remove('hide');
    });
    
    document.getElementById('toyotaCard').addEventListener('click', function() {
        brandsPage.classList.add('hide');
        toyotaPage.classList.remove('hide');
    });
    
    document.getElementById('audiCard').addEventListener('click', function() {
        brandsPage.classList.add('hide');
        audiPage.classList.remove('hide');
    });
    
    document.getElementById('mercedesCard').addEventListener('click', function() {
        brandsPage.classList.add('hide');
        mercedesPage.classList.remove('hide');
    });
    
    document.getElementById('peugeotCard').addEventListener('click', function() {
        brandsPage.classList.add('hide');
        peugeotPage.classList.remove('hide');
    });
    
    // Boutons de retour
    document.getElementById('teslaBack').addEventListener('click', function() {
        teslaPage.classList.add('hide');
        brandsPage.classList.remove('hide');
    });
    
    document.getElementById('bmwBack').addEventListener('click', function() {
        bmwPage.classList.add('hide');
        brandsPage.classList.remove('hide');
    });
    
    document.getElementById('toyotaBack').addEventListener('click', function() {
        toyotaPage.classList.add('hide');
        brandsPage.classList.remove('hide');
    });
    
    document.getElementById('audiBack').addEventListener('click', function() {
        audiPage.classList.add('hide');
        brandsPage.classList.remove('hide');
    });
    
    document.getElementById('mercedesBack').addEventListener('click', function() {
        mercedesPage.classList.add('hide');
        brandsPage.classList.remove('hide');
    });
    
    document.getElementById('peugeotBack').addEventListener('click', function() {
        peugeotPage.classList.add('hide');
        brandsPage.classList.remove('hide');
    });
});
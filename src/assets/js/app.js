window.onload = () => {
  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
      toShowScreen3(user);
      // Usuario está logeado
      var displayName = user.displayName;
      var email = user.email;

      console.log('>>>>>>>>>>>>>>>');
      console.log(user.emailVerified);
      console.log('>>>>>>>>>>>>>>>');

      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log(user);
    } else {
      // Usuario no está logeado
      screen1.style.display = 'block';
      screen2.style.display = 'none';
      screen3.style.display = 'none';
      console.log('Usuario no logeado');
    }
  });
};

function toShowScreen3(user) {
  let userFacebook = user.providerData;
  let userGoogle = user.providerData;
  if (user.emailVerified) {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'none';
    document.getElementById('screen3').style.display = 'block';
  } else if (userFacebook[0].providerId === 'facebook.com') {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'none';
    document.getElementById('screen3').style.display = 'block';
  } else if (userGoogle[0].providerId === 'google.com') {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'none';
    document.getElementById('screen3').style.display = 'block';
  }
}

// Sección registrar
function register() {
  const emailValue = document.getElementById('email_signUp').value;
  const passwordValue = document.getElementById('password_signUp').value;
  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
    .then(function() {
      check();
      console.log('Usuario registrado');
    })
    .catch(function(error) {
      console.log('Error de Firebase: ' + error.code);
      console.log('Error de Firebase, mensaje: ' + error.message);
    });
}

function login() {
  const emailValue = document.getElementById('email_login').value;
  const passwordValue = document.getElementById('password_login').value;
  firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
    /* .then(function() {
      console.log('Usuario con login exitoso');
      toShowScreen3(user);
    })*/
    .catch(function(error) {
      console.log('Error de Firebase: ' + error.code);
      console.log('Error de Firebase, mensaje: ' + error.mensaje);
      screen1.style.display = 'block';
      screen2.style.display = 'none';
      screen3.style.display = 'none';
    });
}


function loginFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(()=> {
      console.log('Login con facebook');
      return true;
    })
    .catch((error) => {
      console.log('Error de Firebase > ' + error.code);
      console.log('Error de Firebase, mensaje > ' + error.message);
    });
}

function loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(()=> {
      console.log('Login con Google');
    })
    .catch((error) => {
      console.log('Error de Firebase > ' + error.code);
      console.log('Error de Firebase, mensaje > ' + error.message);
    });
}

function logout() {
  firebase.auth().signOut()
    .then(()=> {
      console.log('Cerraste sesión');
    })
    .catch();
}

function check() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification()
    .then(function() {
    // Email sent.
      console.log('Enviando correo....');
    })
    .catch(function(error) {
    // An error happened.
      console.log(error);
    });
}

// Función del menú lateral
function toggleMenu() { 
  if (sideMenu.className.indexOf('menu_closed') >= 0) { 
    openMenu();  
  } else {
    closeMenu(); 
  }
}

function openMenu() {
  sideMenu.classList.remove('menu_closed');
  sideMenu.classList.add('menu_open');
}

function closeMenu() {
  sideMenu.classList.add('menu_closed');
  sideMenu.classList.remove('menu_open');
}
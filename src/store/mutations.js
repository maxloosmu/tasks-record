export default {
  async auth(state, mode) {
    let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyCgJpHmgdBPviuM0jCugB3Bm_IwpfVJWKI';
    if (mode=="signup") {
      url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyCgJpHmgdBPviuM0jCugB3Bm_IwpfVJWKI';
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password'),
        returnSecureToken: true
      })
    });
    // state.response = response;
    const responseData = await response.json();
    state.response = responseData;
    if (!response.ok) {
      state.error = new Error(
        responseData.message || responseData.error || 'Failed to authenticate. Check your login data.'
      );
      console.log(state.error);
      throw state.error;
    }
    state.token = await responseData.idToken;
    localStorage.setItem('token', state.token);
    localStorage.setItem('userId', await responseData.localId);
    // state.token = localStorage.getItem('token');
    state.userId = localStorage.getItem('userId');
    
    window.location.reload();
  }
};
/**
 * GAS API Bridge - replaces google.script.run with fetch()
 * Deploy GAS as web app, set GAS_URL below.
 */

const GAS_URL = 'https://script.google.com/macros/s/AKfycbwAXpHRV65LFiNweiSCbk3DehrNgpC1x8KRkHPOMzOZNR-OXGnLhO1DN3DA_jPWIf_-mQ/exec';

const gasApi = {
  _successHandler: null,
  _failureHandler: null,

  withSuccessHandler(fn) {
    const c = Object.create(this);
    c._successHandler = fn;
    return c;
  },

  withFailureHandler(fn) {
    const c = Object.create(this);
    c._failureHandler = fn;
    return c;
  },

  async _call(action, params) {
    try {
      const res = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action, params }),
      });
      const data = await res.json();
      if (this._successHandler) this._successHandler(data);
    } catch (err) {
      if (this._failureHandler) this._failureHandler(err);
    } finally {
      this._successHandler = null;
      this._failureHandler = null;
    }
  },

  // Auth
  login(username, password) { return this._call('login', { username, email: username, password }); },
  logout(sessionId) { return this._call('logout', { sessionId }); },
  getSession(sessionId) { return this._call('getSession', { sessionId }); },

  // Dashboard
  getDashboardData() { return this._call('getDashboardData'); },
  getAktivitas() { return this._call('getAktivitas'); },
  getProgressBulanan() { return this._call('getProgressBulanan'); },
  getPetaProyek() { return this._call('getPetaProyek'); },
  getPetaData() { return this._call('getPetaData'); },

  // Data
  getDataMenu(menu) { return this._call('getDataMenu', { menu }); },
  getUsers() { return this._call('getUsers'); },
  addUser(data) { return this._call('addUser', { data }); },
  updateUser(data) { return this._call('updateUser', { data }); },
  deleteUser(userId) { return this._call('deleteUser', { userId }); },
  setupDatabase() { return this._call('setupDatabase'); },

  // CRUD
  tambahProyek(data) { return this._call('tambahProyek', { data }); },
  tambahLaporan(data) { return this._call('tambahLaporan', { data }); },
  tambahKerusakan(data) { return this._call('tambahKerusakan', { data }); },
  tambahDokumentasi(data) { return this._call('tambahDokumentasi', { data }); },
  tambahProgress(data) { return this._call('tambahProgress', { data }); },
  updateProgres(data) { return this._call('updateProgres', { data }); },
};

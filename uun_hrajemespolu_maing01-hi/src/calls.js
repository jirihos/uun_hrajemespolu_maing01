import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// NOTE During frontend development it's possible to redirect uuApp command calls elsewhere, e.g. to production/staging
// backend, by configuring it in *-hi/env/development.json:
//   "uu5Environment": {
//     "callsBaseUri": "https://uuapp-dev.plus4u.net/vnd-app/awid"
//   }

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  loadGallery(dtoIn) {
    const commandUri = Calls.getCommandUri("gallery/get");
    return Calls.call("get", commandUri, dtoIn);
  },

  galleryDelete(dtoIn) {
    const commandUri = Calls.getCommandUri("gallery/delete");
    return Calls.call("post", commandUri, dtoIn);
  },

  sportsFieldGet(dtoIn) {
    const commandUri = Calls.getCommandUri("sportsField/get");
    return Calls.call("get", commandUri, dtoIn);
  },
  sportsFieldList(dtoIn) {
    const commandUri = Calls.getCommandUri("sportsField/list");
    return Calls.call("get", commandUri, dtoIn);
  },

  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri);
  },

  reviewList(dtoIn) {
    const commandUri = Calls.getCommandUri("review/list");
    return Calls.call("get", commandUri, dtoIn);
  },

  reviewGetByUser(dtoIn) {
    const commandUri = Calls.getCommandUri("review/getByUser");
    return Calls.call("get", commandUri, dtoIn);
  },

  listOwn(dtoIn) {
    const commandUri = Calls.getCommandUri("reservation/listOwn");
    return Calls.call("get", commandUri, dtoIn);
  },

  reservationListBySportsField(dtoIn) {
    const commandUri = Calls.getCommandUri("reservation/listBySportsField");
    return Calls.call("get", commandUri, dtoIn);
  },

  reservationCancelByAdmin(dtoIn) {
    const commandUri = Calls.getCommandUri("reservation/cancelByAdmin");
    return Calls.call("post", commandUri, dtoIn);
  },

  sportsFieldDelete(dtoIn) {
    const commandUri = Calls.getCommandUri("sportsField/delete");
    return Calls.call("post", commandUri, dtoIn);
  },

  reservationCancelByUser(dtoIn) {
    const commandUri = Calls.getCommandUri("reservation/cancelByUser");
    return Calls.call("post", commandUri, dtoIn);
  },

  reservationCreate(dtoIn) {
    const commandUri = Calls.getCommandUri("reservation/create");
    return Calls.call("post", commandUri, dtoIn);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  getCommandUri(useCase, baseUri = Environment.appBaseUri) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },

  async reviewCreate(dtoIn) {
    const commandUri = Calls.getCommandUri("review/create");
    return await Calls.call("post", commandUri, dtoIn);
  },

  async reviewUpdate(dtoIn) {
    const commandUri = Calls.getCommandUri("review/update");
    return await Calls.call("post", commandUri, dtoIn);
  },
};

export default Calls;

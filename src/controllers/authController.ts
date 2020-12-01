import ControllerBase from "./base/controllerBase";
import UserService from "../app/services/userService";

export default class AuthenticationController extends ControllerBase {
  private static _userService: UserService = new UserService();

  constructor() {
      super("Auth", false);
  }

  protected initializeRoutes() {

  }
}
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const Httpcode_1 = __importDefault(require("../utils/Httpcode"));
const PhotoService_1 = __importDefault(require("../services/PhotoService"));
const AuthorizationCheckerMiddleware_1 = require("../middlewares/AuthorizationCheckerMiddleware");
/**
 * PhotoController
 */
let PhotoController = class PhotoController {
    /**
     * getRandomCover
     */
    async getCover() {
        return PhotoService_1.default.getRandomCover();
    }
};
__decorate([
    routing_controllers_1.Get(),
    routing_controllers_1.HttpCode(Httpcode_1.default.OK),
    routing_controllers_1.UseBefore(AuthorizationCheckerMiddleware_1.AuthorizationCheckerMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "getCover", null);
PhotoController = __decorate([
    routing_controllers_1.JsonController('/photos')
], PhotoController);
exports.PhotoController = PhotoController;

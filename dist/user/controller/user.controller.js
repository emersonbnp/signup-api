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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_document_1 = require("../schema/user.document");
const user_service_interface_1 = require("../service/user.service.interface");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async save(response, user) {
        try {
            const newUser = await this.userService.save(user);
            return response.status(common_1.HttpStatus.CREATED).json(newUser);
        }
        catch (e) {
            if (e instanceof common_1.NotFoundException) {
                return response.status(common_1.HttpStatus.NOT_FOUND).json();
            }
            if (e instanceof common_1.BadRequestException) {
                return response.status(common_1.HttpStatus.BAD_REQUEST).json();
            }
            return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json();
        }
    }
    async login(response, user) {
        const foundUser = await this.userService.findUser(user['email'], user['password']);
        return response.status(common_1.HttpStatus.OK).json({
            uuid: foundUser.userUuid,
            email: foundUser.email,
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_document_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "save", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_document_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __param(0, (0, common_1.Inject)(user_service_interface_1.IUserService)),
    __metadata("design:paramtypes", [Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
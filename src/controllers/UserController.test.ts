import { UserController } from './UserController';
import { User } from '../entities/User';
import { getMockUser } from '../__mocks__/mockUser';
import { makeMockResponse } from '../__mocks__/mockResponse';
import { Request } from 'express';

const mockUser: User = getMockUser()

let mockReturnCreateUser
jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return {
                createUser: mockReturnCreateUser
            }
        })
    }
})

describe('UserController', () => {
    const userController = new UserController()
    const request = {
        body: {
            name: 'Marcelo',
            email: 'marcelo@email.com'
        }
    } as Request

    const response = makeMockResponse()

    it('Deve retornar status 201 e o usuário criado', async () => {
        mockReturnCreateUser = jest.fn().mockImplementation()
        await userController.createUser(request, response)
        expect(response.state.status).toBe(201)
        expect(response.state.json).toHaveProperty('user_id')
        expect(response.state.json).toMatchObject({
            name: 'Marcelo',
            email: 'marcelo@email.com'
        })
    })

    it('Deve retornar status 400 quando o usuário não informar name e email', async () => {
        const request = {
            body: {
                name: '',
                email: ''
            }
        } as Request

        await userController.createUser(request,response)
        expect(response.state.status).toBe(400)
    })

    it('Deve retornar status 500, quando ocorrer um erro', async () => {
        mockReturnCreateUser = jest.fn().mockImplementation(() => {
            throw new Error()
        })
        await userController.createUser(request, response)
        expect(response.state.status).toBe(500)
    })
})
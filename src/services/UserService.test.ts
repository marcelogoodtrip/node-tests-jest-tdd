import { UserService } from './UserService'
import { getMockUser } from '../__mocks__/mockUser'

jest.mock('../repositories/UserRepository')
const mockuserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
    const mockUser = getMockUser()
    const userService = new UserService ({
        userRepository: mockuserRepository,
        name: 'Marcelo',
        email: 'marcelo@email.com'
    })

    it('Deve retornar o usuário quando for salvo', async () => {
        mockuserRepository.save = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        const user = await userService.createUser()
        expect(user).toHaveProperty('user_id')
        expect(user).toMatchObject({
            name: 'Marcelo',
            email: 'marcelo@email.com'
        })
    })
})
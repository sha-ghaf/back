import bcrypt from 'bcrypt';
import {
	badRequestResponse,
	conflictResponse,
	notFoundResponse,
	okResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
// import Users from '../../helpers/db/users.db.js';
export async function register(req, res, next) {
    try {
        const { name, email, password, phoneNumber, role } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            return notFoundResponse(res, 'Email already exists');
        }
        if (user.role !== 'student' && role !== 'teacher') {
            return badRequestResponse(
                res,
                'must be student or teacher',
            );
        }
        const encryptedPassword = bcrypt.hashSync(password, 10);
        await prisma.User.create({
            data: {
                name,
                email,
                password : encryptedPassword,
                phoneNumber,
                role
            }
        })
        return okResponse(
			res,
			'User registered successfully',
		);
    } catch (err) {
        next(err);
    }
	
}

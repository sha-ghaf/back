import bcrypt from 'bcrypt';
import {
	// badRequestResponse,
	// conflictResponse,
	notFoundResponse,
	okResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const mail = await prisma.mail.findUnique({
            where: {
                email: email,
            },
        });
        if (!mail) {
            return notFoundResponse(res, 'Invalid email or password');
        }
        const isValid = bcrypt.compareSync(password, prisma.User.password);
        if (!isValid) {
            return notFoundResponse(res, 'Invalid email or password');
        }
        return okResponse(
			res,
			'login successfully',
		);
    } catch (err) {
        next(err)
    }
	


    
	// const user = Users.find((u) => u.id === id);
	// if (!user) {
	// 	return badRequestResponse(res, 'Invalid ID or password');
	// }
	// const isValid = bcrypt.compareSync(password, user.password);
	// if (!isValid) {
	// 	return res.status(400).json({
	// 		message: `Invalid ID or password`,
	// 	});
	// }
	// return res.json({
	// 	message: 'User logged in succesfully',
	// 	data: user,
	// });
}

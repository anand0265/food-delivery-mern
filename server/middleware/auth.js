const jwt = require("jsonwebtoken");

// const authMiddleware = async (req, res, next) => {
//     try {
//         // Get the authorization header
//         const authHeader = req.headers.authorization;
        
//         // Check if authorization header is missing or improperly formatted
//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).send({
//                 success: false,
//                 message: "Not Authorized, Login Again",
//             });
//         }

//         // Extract the token (remove 'Bearer ' prefix)
//         const token = authHeader.split(" ")[1];
//         console.log("Extracted Token:", token); // Debugging

//         // Verify the token
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded Token:", token_decode); // Debugging

//         req.body.userId = token_decode.id;

//         next(); // Move to the next middleware
//     } catch (error) {
//         console.error("JWT Verification Error:", error);
//         res.status(401).send({
//             success: false,
//             message: "Invalid Token",
//         });
//     }
// };

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                success: false,
                message: "Not Authorized, Login Again",
            });
        }

        const token = authHeader.split(" ")[1];
        console.log("Extracted Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        // ✅ Fix: Ensure req.body exists before assigning userId
        req.body = req.body || {};
        req.body.userId = decoded.id;

        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).send({
            success: false,
            message: "Invalid Token",
        });
    }
};


module.exports = authMiddleware;


// const jwt = require('jsonwebtoken')


// const authMiddleware = async(req,res)=>{
//     const token = req.headers;
//     if(!token){
//         return res.status(500).send({
//             success:false,
//             message:"Not Authorize Login Again"
//         })
//     }

//     try {
//         const token_decode = jwt.verify(token,process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
//         next();
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:"Error"
//         })
        
//     }

// }

// module.exports = authMiddleware
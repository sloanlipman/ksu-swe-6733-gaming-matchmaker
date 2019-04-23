package com.gamingMatchMaker.gamingMatchMaker.controller.authorization;

import com.gamingMatchMaker.gamingMatchMaker.service.authService.UserAuthRecPair;
import com.gamingMatchMaker.gamingMatchMaker.service.authService.UserAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class UserAuthController {

    @Autowired
    private UserAuthService service;

    @PostMapping("/authorizeUser")
    public ResponseEntity<AuthUserResponse> authUser(@RequestBody AuthUserRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();
        ResponseEntity re = null;
        try {
            UserAuthRecPair authResults = service.authByEmailPassword(email, password);

            HttpHeaders headers = new HttpHeaders();

            re = new ResponseEntity<>(
                    new AuthUserResponse(authResults.getAuth(), new UserDetail(authResults.getUserRec())),
                    headers, HttpStatus.OK);

        }
        catch (Exception e)
        {
            re = new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return re;
    }
}

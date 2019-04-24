package com.gamingMatchMaker.gamingMatchMaker.controller.userController;

import com.gamingMatchMaker.gamingMatchMaker.controller.authorization.UserDetail;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;
import com.gamingMatchMaker.gamingMatchMaker.service.userService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins="*", allowedHeaders="*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/update/")
    public ResponseEntity<UserDetail> updateUser(@RequestBody UserDetail detail) {
        Optional<UserRec> userRecOpt =  this.userService.update(detail);

        if(userRecOpt.isPresent()) {
            return new ResponseEntity<>(new UserDetail(userRecOpt.get()), HttpStatus.OK);
        }

        throw new RuntimeException("null");
    }

}

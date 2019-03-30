package com.gamingMatchMaker.gamingMatchMaker.controller.registration;

import com.gamingMatchMaker.gamingMatchMaker.controller.authorization.UserDetail;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;
import com.gamingMatchMaker.gamingMatchMaker.service.registrationService.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RegistrationController {
    @Autowired
    private RegistrationService service;

    @PostMapping("/register")
    public ResponseEntity<CreateRegistrationResponse> createRegistration(@RequestBody CreateRegistrationRequest request) {
        // first create new user
        System.out.println("Inside the Response Entity constructor");
        System.out.println(request.detail.getEmail());
        System.out.println(request.detail.getFirst_name());
        System.out.println(request.detail.getLast_name());
        System.out.println(request.detail.getAge());
        System.out.println(request.detail.getUser_type());
        System.out.println(request.detail.getLocation());
        UserDetail newUser = new UserDetail(service.createRegisterUser(new UserRec(request.getDetail())));

       CreateRegistrationResponse response = new CreateRegistrationResponse(newUser);

        HttpHeaders headers = new HttpHeaders();

        return new ResponseEntity<>(response, headers, HttpStatus.OK);
    }

}



package com.gamingMatchMaker.gamingMatchMaker.controller.registration;

import com.gamingMatchMaker.gamingMatchMaker.controller.authorization.UserDetail;

public class CreateRegistrationResponse {
    UserDetail detail;

    public CreateRegistrationResponse() {
    }

    public CreateRegistrationResponse(UserDetail detail) {
        System.out.println("Got into create registration response");
        System.out.println(detail.getEmail());
        this.detail = detail;
    }

    public UserDetail getDetail() {
        return detail;
    }

    public void setDetail(UserDetail detail) {
        this.detail = detail;
    }
}

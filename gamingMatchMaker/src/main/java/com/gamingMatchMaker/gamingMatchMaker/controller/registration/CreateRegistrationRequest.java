package com.gamingMatchMaker.gamingMatchMaker.controller.registration;

import com.gamingMatchMaker.gamingMatchMaker.controller.authorization.UserDetail;

public class CreateRegistrationRequest {
    UserDetail detail;

    public CreateRegistrationRequest() {
    }

    public CreateRegistrationRequest(UserDetail detail) {
        System.out.print("email IS " + detail.getEmail());
        System.out.print("first name IS " + detail.getFirst_name());
        this.detail = detail;
    }

    public UserDetail getDetail() {
        return detail;
    }

    public void setDetail(UserDetail detail) {
        this.detail = detail;
    }
}

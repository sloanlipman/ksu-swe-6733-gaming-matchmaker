package com.gamingMatchMaker.gamingMatchMaker.controller.registration;

import com.gamingMatchMaker.gamingMatchMaker.service.registrationService.RegistrationService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class RegistrationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RegistrationService service;

    @Before
    public void setup() {
        // build the mock server responses
    }

    @Test
    public void testRegisterUserSuccess() throws Exception {

    }

    @Test
    public void testRegisterUserFail() throws Exception {

    }


}
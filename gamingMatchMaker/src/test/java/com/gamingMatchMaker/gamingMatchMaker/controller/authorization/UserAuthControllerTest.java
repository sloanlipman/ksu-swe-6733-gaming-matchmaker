package com.gamingMatchMaker.gamingMatchMaker.controller.authorization;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gamingMatchMaker.gamingMatchMaker.model.Location;
import com.gamingMatchMaker.gamingMatchMaker.model.UserAuthentication;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;
import com.gamingMatchMaker.gamingMatchMaker.service.authService.UserAuthRecPair;
import com.gamingMatchMaker.gamingMatchMaker.service.authService.UserAuthService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserAuthControllerTest {

    private static final String TEST_USERNAME = "user1";
    private static final String TEST_PASSWORD = "pass1";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserAuthService service;

    @Before
    public void setup()  throws Exception {
        // build the mock server responses

        AuthUserRequest mockRequest = new AuthUserRequest(TEST_USERNAME, TEST_PASSWORD);

        Location mockLocation = new Location("30047", "liburn","GA",
                50.30f,25.5f, "test is a test");

        UserRec mockUserRec = new UserRec("test@aaa.com","test",
                "test","test",1,true,2, mockLocation);

        UserAuthentication mockAuth =  new UserAuthentication(1,
                UUID.fromString("ee97d265-4828-4aa5-8b7c-1ab41b03b405"), 1);

        UserAuthRecPair mockAuthRecPair = new UserAuthRecPair(mockAuth, mockUserRec);

        AuthUserResponse mockUserAuthResponse = new AuthUserResponse(mockAuth, new UserDetail(mockUserRec));

        when(service.authByEmailPassword(TEST_USERNAME, TEST_PASSWORD))
                .thenReturn(mockAuthRecPair);
    }

    @Test
    public void testAuthUser() throws Exception {

        // usually for testing read mock JSON's from a file

        String mockRequestJSON = readFileFromResources(
                "com.gamingMatchMaker.gamingMatchMaker.controller.authorization",
                "authUserSuccessRequest.json"
        );
        String mockResponseJSON = readFileFromResources(
                "com.gamingMatchMaker.gamingMatchMaker.controller.authorization",
                "authUserSuccessResponse.json"
        );

        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/authorizeUser")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(mockRequestJSON);

        mockMvc.perform(requestBuilder)
                .andExpect(status().isOk())
                .andExpect(content().json(mockResponseJSON));
    }

    private String readFileFromResources(String pkgName, String fileName) throws Exception {
        String result;

        String pathName = pkgName.replace('.', '/') + "/" + fileName;

        InputStream inputStream =
                this.getClass().getClassLoader().getResourceAsStream(pathName);

        result = new BufferedReader(new InputStreamReader(inputStream))
                .lines().collect(Collectors.joining("\n"));

        return result;
    }
}
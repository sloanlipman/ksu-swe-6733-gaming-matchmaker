package com.gamingMatchMaker.gamingMatchMaker.controller;

import com.gamingMatchMaker.gamingMatchMaker.controller.authorization.UserDetail;
import com.gamingMatchMaker.gamingMatchMaker.controller.registration.CreateRegistrationRequest;
import com.gamingMatchMaker.gamingMatchMaker.model.Location;
import com.gamingMatchMaker.gamingMatchMaker.model.UserAuthentication;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;
import com.gamingMatchMaker.gamingMatchMaker.service.LocationService.LocationService;
import com.gamingMatchMaker.gamingMatchMaker.service.authService.UserAuthRecPair;
import com.gamingMatchMaker.gamingMatchMaker.service.authService.UserAuthService;
import com.gamingMatchMaker.gamingMatchMaker.service.registrationService.RegistrationService;
import com.gamingMatchMaker.gamingMatchMaker.service.userService.UserService;
import com.sun.javaws.exceptions.InvalidArgumentException;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public abstract class ControllerTest {

    protected static final String TEST_USERNAME = "user1";
    protected static final String TEST_PASSWORD = "pass1";

    @Autowired
    protected MockMvc mockMvc;

    @MockBean
    private UserAuthService userAuthService;

    @MockBean
    private RegistrationService registrationService;

    @MockBean
    private LocationService locationService;

    @MockBean
    private UserService userService;

    @Before
    public void setupUserAuthService() {
        // build the mock server responses
        Location mockLocation = new Location("30047", "liburn","GA",
                50.30f,25.5f, "test is a test");

        UserRec mockUserRec = new UserRec("test@aaa.com","test",
                "test","test",1,true,2, mockLocation);

        UserAuthentication mockAuth =  new UserAuthentication(1,
                UUID.fromString("ee97d265-4828-4aa5-8b7c-1ab41b03b405"), 1);

        UserAuthRecPair mockAuthRecPair = new UserAuthRecPair(mockAuth, mockUserRec);

        when(userAuthService.authByEmailPassword(TEST_USERNAME, TEST_PASSWORD))
                .thenReturn(mockAuthRecPair);
    }

    @Before
    public void setupRegistrationService() {
        Location mockLocation = new Location("99004","testCiy","NY",
                20.05f,15.50f,"Jons Test Location");
        mockLocation.setId(0);

        Location mockLocationRec = new Location(mockLocation);
        mockLocationRec.setId(42);
        UserRec response = new UserRec(
                "testJon@test.com", "Jon", "Doe",
                "password1", 37, true,
                1, mockLocation
        );
        response.setId(43);
        response.setLocation(mockLocationRec);

        when(this.locationService.GetLocation(eq(mockLocation.getZip()))).thenReturn(mockLocation);

        when(
                registrationService.createRegistration(
                        eq("testJon@test.com"), eq("password1"),
                        anyString(), anyString(),
                        anyInt(), eq(true),
                        eq(1), eq(mockLocation)
                )
        ).thenReturn(Optional.of(response));
    }

    @Before
    public void setupUserService() {
        when(this.userService.update(any()))
                .thenAnswer(new Answer<Optional<UserRec>>() {
                    @Override
                    public Optional<UserRec> answer(InvocationOnMock invocation) throws Throwable {
                        Object param1 = invocation.getArgument(0);
                        if(!(param1 instanceof UserDetail)) {
                            throw  new IllegalArgumentException("userRec was null");
                        }

                        // validate the input userRec here
                        UserDetail inputDetails = (UserDetail) param1;

                        // return an optional copy of the userRec
                        return Optional.of(userRecFromDetail(inputDetails));
                    }
                });
    }

    protected UserRec userRecFromDetail(UserDetail inputDetails) {
        if(inputDetails == null) {
            return null;
        }
        UserRec newUserRec = new UserRec(
                inputDetails.getEmail(),
                inputDetails.getFirst_name(),
                inputDetails.getLast_name(),
                TEST_PASSWORD,
                inputDetails.getAge(),
                inputDetails.isIs_active(),
                inputDetails.getUser_type(),
                inputDetails.getLocation()
        );
        newUserRec.setId(inputDetails.getId());

        return newUserRec;
    }

    protected String readFileFromResources(Class c, String fileName) throws Exception {
        String result;

        if(c == null) {
            throw new IllegalArgumentException("Class cannot be null");
        }

        String pathName = c.getPackage().getName().replace('.', '/') + "/" + fileName;

        InputStream inputStream =
                this.getClass().getClassLoader().getResourceAsStream(pathName);

        if(inputStream == null) {
            throw new FileNotFoundException("No file found in classpath for " + pathName);
        }

        result = new BufferedReader(new InputStreamReader(inputStream))
                .lines().collect(Collectors.joining("\n"));

        return result;
    }
}

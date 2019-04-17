package com.gamingMatchMaker.gamingMatchMaker.service.authService;

        import com.gamingMatchMaker.gamingMatchMaker.model.UserAuthentication;
        import com.gamingMatchMaker.gamingMatchMaker.service.ServiceTest;
        import org.junit.Test;
        import org.springframework.beans.factory.annotation.Autowired;

        import static org.junit.Assert.*;

public class UserAuthServiceImplTest extends ServiceTest {
    @Autowired
    private UserAuthService authService;

    @Test
    public void authByEmailPassword() {
        UserAuthRecPair result = this.authService.authByEmailPassword(USER_1.getEmail(), USER_1.getPassword());

        assertNotNull(result);
        assertNotNull(result.getUserRec());
        assertNotNull(result.getAuth());

        // expected then actual
        assertEquals(USER_1.getEmail(), result.getUserRec().getEmail());
        // assertEquals(USER_1.getId(), result.getUserRec().getId());
        assertEquals(USER_1.getUser_type(), result.getUserRec().getUser_type());

        assertEquals(UUID_SUCCESS, result.getAuth().getAccessToken());
        //assertEquals(USER_1.getId(), result.getAuth().getUserId());
    }


}
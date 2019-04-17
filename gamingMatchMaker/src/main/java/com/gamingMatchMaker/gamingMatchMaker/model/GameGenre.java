package com.gamingMatchMaker.gamingMatchMaker.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="gameGenre")
public class GameGenre {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "int(11)")
    private int id;

    @Column(name= "GenreName")
    private String GenreName;

    @ManyToMany
    private Set<UserRec> users;

    public GameGenre(GameGenre orginal) {
        this.id  = orginal.id;
        this.GenreName = orginal.GenreName;
    }

    public GameGenre(String genreName, Set<UserRec> users) {
        GenreName = genreName;
        this.users = users;
    }

    public GameGenre() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGenreName() {
        return GenreName;
    }

    public void setGenreName(String genreName) {
        GenreName = genreName;
    }

    public Set<UserRec> getUsers() {
        return users;
    }

    public void setUsers(Set<UserRec> users) {
        this.users = users;
    }
}

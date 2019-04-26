package com.gamingMatchMaker.gamingMatchMaker.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="playTime")
public class PlayTime {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "int(11)")
    private int id;
    private String timingName;

    @ManyToMany
    private Set<UserRec> users;

    public PlayTime() {
    }

    public PlayTime(String timingName, Set<UserRec> users) {
        this.timingName = timingName;
        this.users = users;
    }

    public PlayTime(PlayTime original) {
        this.id = original.id;
        this.timingName =  original.timingName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTimingName() {
        return timingName;
    }

    public void setTimingName(String timingName) {
        this.timingName = timingName;
    }

    public Set<UserRec> getUsers() {
        return users;
    }

    public void setUsers(Set<UserRec> users) {
        this.users = users;
    }
}

package com.example.hyperledgerapi.entity;

import java.sql.Timestamp;

public class DeliveryStatus {
    private String id;
    private String deliveryNoteId;
    private String lat;
    private String lng;
    private String title;
    private String prevDistance;
    private String arrivalActual;
    private String arrivalExpected;
    private String createDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDeliveryNoteId() {
        return deliveryNoteId;
    }

    public void setDeliveryNoteId(String deliveryNoteId) {
        this.deliveryNoteId = deliveryNoteId;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getLng() {
        return lng;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPrevDistance() {
        return prevDistance;
    }

    public void setPrevDistance(String prevDistance) {
        this.prevDistance = prevDistance;
    }

    public String getArrivalActual() {
        return arrivalActual;
    }

    public void setArrivalActual(String arrivalActual) {
        this.arrivalActual = arrivalActual;
    }

    public String getArrivalExpected() {
        return arrivalExpected;
    }

    public void setArrivalExpected(String arrivalExpected) {
        this.arrivalExpected = arrivalExpected;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    @Override
    public String toString() {
        return "DeliveryStatus{" +
                "id='" + id + '\'' +
                ", deliveryNoteId='" + deliveryNoteId + '\'' +
                ", lat='" + lat + '\'' +
                ", lng='" + lng + '\'' +
                ", title='" + title + '\'' +
                ", prevDistance='" + prevDistance + '\'' +
                ", arrivalActual='" + arrivalActual + '\'' +
                ", arrivalExpected='" + arrivalExpected + '\'' +
                ", createDate='" + createDate + '\'' +
                '}';
    }
}

package com.example.fypbackend.service.delivery;

import com.example.fypbackend.entity.DeliveryNote;

import java.util.List;

public interface DeliveryNoteServices {

    public void newDeliveryNote(DeliveryNote deliveryNote);

    public DeliveryNote findByDeliveryNoteId(int DeliveryNoteId);

    public List<DeliveryNote> findByOrderId(int orderId);

    public List<DeliveryNote> findByDriverId(int driverId);

}

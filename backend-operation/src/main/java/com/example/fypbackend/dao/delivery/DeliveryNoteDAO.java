package com.example.fypbackend.dao.delivery;

import com.example.fypbackend.entity.DeliveryNote;

import java.util.List;

public interface DeliveryNoteDAO {

    public void newDeliveryNote(DeliveryNote deliveryNote);

    public DeliveryNote findByDeliveryNoteId(int deliveryNoteId);

    public List<DeliveryNote> findByOrderId(int orderId);

    public List<DeliveryNote> findByDriverId(int driverId);
}

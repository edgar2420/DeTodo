import 'dart:async';

import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatefulWidget {
  const MainApp({super.key});

  @override
  State<MainApp> createState() => _MainAppState();
}

class _MainAppState extends State<MainApp> {
  final Completer<GoogleMapController> _controller =
      Completer<GoogleMapController>();

  static const CameraPosition _kInitialPosition = CameraPosition(
    target: LatLng(-17.786673, -63.180229),
    zoom: 17.0,
  );
  List<Marker> markers = [];

  @override
  void initState() {
    super.initState();
    _addMarkers();
  }

  void _addMarkers() {
    const List<LatLng> positions = [
      LatLng(-17.809530, -63.205917),
      LatLng(-17.76884, -63.18276),
      LatLng(-17.77443, -63.17363),
      LatLng(-17.783312, -63.18214),
      LatLng(-17.78647, -63.18604),
    ];

    for (int i = 0; i < positions.length; i++) {
      markers.add(
        Marker(
          markerId: MarkerId(i.toString()),
          position: positions[i],
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: GoogleMap(
          mapType: MapType.normal,
          initialCameraPosition: _kInitialPosition,
          onMapCreated: (GoogleMapController controller) {
            _controller.complete(controller);
          },
          markers: Set<Marker>.of(markers),
        ),
      ),
    );
  }
}

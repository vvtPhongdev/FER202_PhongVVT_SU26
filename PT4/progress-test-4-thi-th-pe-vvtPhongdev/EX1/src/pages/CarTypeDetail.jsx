import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spinner, Alert, Table, Badge } from "react-bootstrap";
import { fetchCarTypes, fetchCars } from "../api/carApi";
import { formatPriceRange } from "../utils/format";

export default function CarTypeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carType, setCarType] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      // TODO-10A: Dùng Promise.all fetch carTypes + cars
      // Tìm carType theo id; nếu không tìm thấy → navigate('/not-found', { replace: true })
      // Lọc cars theo carTypeId, cập nhật state
      try {
        const [types, allCars] = await Promise.all([
          fetchCarTypes(),
          fetchCars(),
        ]);
        const found = types.find((ct) => String(ct.id) === String(id));
        if (!found) {
          navigate("/not-found", { replace: true });
          return;
        }
        setCarType(found);
        setCars(allCars.filter((c) => String(c.carTypeId) === String(id)));
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to load car type details.");
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  // TODO-10A: Nếu loading → Spinner; nếu error → Alert danger
  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error)
    return (
      <Alert variant="danger" role="alert">
        {error}
      </Alert>
    );

  return (
    <div>
      {/* TODO-10A: Nút Back navigate('/car-types') */}
      <Button
        variant="secondary"
        onClick={() => navigate("/car-types")}
        className="mb-3"
      >
        ← Back to Car Types
      </Button>
      {/* TODO-10A: Card với carType name, Badge id */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <span>
              Car Type: <strong>{carType.name}</strong>
            </span>
            <Badge bg="primary">ID: {carType.id}</Badge>
          </Card.Title>
        </Card.Body>
      </Card>
      {/* TODO-10A: Table cars (name, brand, transmission, formatPriceRange, lastServiced) */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Transmission</th>
            <th>Price Range</th>
            <th>Last Serviced</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={car.id}>
              <td>{index + 1}</td>
              <td>{car.name}</td>
              <td>{car.brand}</td>
              <td>{car.transmission}</td>
              <td>{formatPriceRange(car.priceWeekday, car.priceWeekend)}</td>
              <td>{car.lastServiced}</td>
            </tr>
          ))}
          {cars.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No cars found for this car type.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

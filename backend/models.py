from db import get_conn

class RailwayModel:
    def __init__(self):
        self.conn = get_conn()
        self.cur = self.conn.cursor(dictionary=True)

    def create_user(self, values):
        self.cur.execute(
            "INSERT INTO user_info (fname, lname, user_name, password, phno, gender, dob, age) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",
            values
        )

    def auth_user(self, username, password):
        self.cur.execute("SELECT * FROM user_info WHERE user_name=%s AND password=%s", (username, password))
        return self.cur.fetchone()

    def book_ticket(self, values):
        self.cur.execute(
            "INSERT INTO railway (pnr_no, pname, age, train_no, train_name, gender, class, source, destination, fare) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
            values
        )

    def get_ticket(self, pnr):
        self.cur.execute("SELECT * FROM railway WHERE pnr_no=%s", (pnr,))
        return self.cur.fetchone()

    def delete_ticket(self, pnr):
        self.cur.execute("DELETE FROM railway WHERE pnr_no=%s", (pnr,))
    
    def update_seat_count(self, train_name, class_name):
        column = class_name.lower()
        sql = f"""
            UPDATE train_details
            SET {column} = CASE WHEN {column} > 0 THEN {column} - 1 ELSE 0 END
            WHERE train_name = %s
        """
        self.cur.execute(sql, (train_name,))
        self.conn.commit()

    def get_all_trains(self):
        self.cur.execute("SELECT * FROM train_details")
        return self.cur.fetchall()
    
    def calculate_fare(self, train_name, source, destination, class_name):
        self.cur.execute("""
            SELECT station_order, station_name FROM train_routes 
            WHERE train_name=%s ORDER BY station_order
        """, (train_name,))
        stations = self.cur.fetchall()

        source_index = next((s['station_order'] for s in stations if s['station_name'].lower() == source.lower()), None)
        dest_index = next((s['station_order'] for s in stations if s['station_name'].lower() == destination.lower()), None)

        if source_index is None or dest_index is None or source_index >= dest_index:
            return None  # Invalid journey

        distance = dest_index - source_index
        class_fare = {"ac1": 200, "ac2": 150, "ac3": 100, "sleeper": 50}
        
        fare = class_fare.get(class_name.lower())
        if fare is None:
            return None  # Invalid class

        return distance * fare
        
    def get_route(self, train_name):
        self.cur.execute(
            "SELECT station_name FROM train_routes WHERE LOWER(train_name) = LOWER(%s) ORDER BY station_order",
            (train_name.strip(),)
        )
        rows = self.cur.fetchall()
        return [{"station_name": row["station_name"]} for row in rows]






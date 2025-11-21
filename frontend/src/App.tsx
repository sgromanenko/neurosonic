< PrivateRoute >
    <Player />
</PrivateRoute >
                        }
                    />
    < Route path = "*" element = {< Navigate to = "/" />} />
                </Routes >

    { isAuthenticated && <BottomNav />}
            </div >
        </Router >
    );
}

export default App;

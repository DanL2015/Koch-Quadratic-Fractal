#include <SFML/Graphics.hpp>
#include <iostream>
#include <vector>
#include <thread>
#include <chrono>
#include <Windows.h>
using namespace std;
using namespace sf;

int windowx = 512;
int windowy = 512;
RenderWindow window(VideoMode(windowx, windowy), "SFML Fractal", Style::Close | Style::Titlebar | Style::Resize);

VertexArray lines(LineStrip, 2);
vector <Vector2f> coords;

int main()
{
	lines[0].position = Vector2f(156, 256);
	lines[1].position = Vector2f(356, 256);
	coords.push_back(lines[0].position);
	coords.push_back(lines[1].position);
	window.draw(lines);
	window.display();
	Sleep(1000);
	while (window.isOpen())
	{
		Event evnt;
		while (window.pollEvent(evnt))
		{
			if (evnt.type == Event::Closed)
			{
				window.close();
			}
		}
		//Updating Fractal

		for (int i = 0; i < coords.size()-1; i++)
		{
			Vector2f A = Vector2f(coords[i]);
			Vector2f B;
			Vector2f C;
			Vector2f D;
			Vector2f E;
			Vector2f F = Vector2f(coords[i + 1]);
			double d = sqrt((A.x - F.x) * (A.x - F.x) + (A.y - F.y) * (A.y - F.y));
			B = Vector2f(A.x + (F.x - A.x) / 3, A.y + (F.y - A.y) / 3);
			C = Vector2f(A.x + (F.x - A.x) / 3, A.y + (F.y - A.y) / 3);
			D = Vector2f(A.x + 2 * (F.x - A.x) / 3, A.y + 2 * (F.y - A.y) / 3);
			E = Vector2f(A.x + 2 * (F.x - A.x) / 3, A.y + 2 * (F.y - A.y) / 3);
			int dir; //1 for N, 2 for S, 3 for E, 4 for W
			if (A.x == F.x)
			{
				if (A.x > 256) //Extend to +x
				{
					C.x += (d / 3);
					D.x += (d / 3);
				}
				if (A.x <= 256) //Extend to -x
				{
					C.x -= (d / 3);
					D.x -= (d / 3);
				}
			}
			else if (A.y == F.y)
			{
				if (A.y > 256) //Extend to +y
				{
					C.y += (d / 3);
					D.y += (d / 3);
				}
				if (A.y <= 256) //Extend to -y
				{
					C.y -= (d / 3);
					D.y -= (d / 3);
				}
			}
			else
			{
				cout << "Not possible" << endl;
			}
			coords.insert(coords.begin() + i + 1, E);
			coords.insert(coords.begin() + i + 1, D);
			coords.insert(coords.begin() + i + 1, C);
			coords.insert(coords.begin() + i + 1, B);
			i += 4;
		}
		lines.clear();
		lines.resize(coords.size());
		for (int i = 0; i < coords.size(); i++)
		{
			lines[i] = coords[i];
		}
		//Drawing Fractal to window
		window.clear();
		window.draw(lines);
		window.display();
		Sleep(1000);
	}
}